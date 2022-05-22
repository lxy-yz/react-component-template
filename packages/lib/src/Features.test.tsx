import { FeatureProvider, FeatureToggle, useFeature } from './Features'
import featureConfigFixture from './features.json'
import { cleanup, render, screen, userEvent } from './test-utils'

// FIXME: jest-dom type errors
// https://github.com/testing-library/jest-dom/issues/427
describe('<FeatureToggle />', () => {
  const elemWithProvider = (
    <FeatureProvider featureConfig={featureConfigFixture}>
      <FeatureToggle />
    </FeatureProvider>
  )
  const elemWithoutProvider = <FeatureToggle />

  it('should return the ui', () => {
    render(elemWithProvider)

    expect(screen.getByText('Feature Toggle')).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: /Feature Toggle/ }),
    ).toBeChecked()

    expect(screen.getByText('Enabled Feature')).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: /Enabled Feature/ }),
    ).toBeChecked()

    expect(screen.getByText('Disabled Feature')).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: /Disabled Feature/ }),
    ).not.toBeChecked()
  })

  it('should toggle feature checkbox and persists the change', async () => {
    render(elemWithProvider)

    expect(
      screen.getByRole('checkbox', { name: /Feature Toggle/ }),
    ).toBeChecked()

    await userEvent.click(screen.getByRole('checkbox', { name: /Feature Toggle/ }))

    expect(
      screen.getByRole('checkbox', { name: /Feature Toggle/ }),
    ).not.toBeChecked()

    // emulate unmount and remount
    cleanup()
    render(elemWithProvider)

    expect(
      screen.getByRole('checkbox', { name: /Feature Toggle/ }),
    ).not.toBeChecked()

    localStorage.clear()
  })

  it('should throw when not used within <FeatureProvider />', () => {
    expect(() => render(elemWithoutProvider)).toThrowError(
      /You must render this element inside a <FeatureProvider> element/,
    )
  })
})

describe('useFeature', () => {
  const UseFeature = ({ name }: { name: string }) => {
    const { enabled } = useFeature(name)
    return <>{enabled ? 'true' : 'false'}</>
  }

  it('should return the correct feature', () => {
    render(
      <FeatureProvider>
        <UseFeature name="Feature Toggle" />
      </FeatureProvider>,
    )

    expect(screen.getByText('true')).toBeInTheDocument()
  })

  it('should throw when feature not exist', () => {
    expect(() =>
      render(
        <FeatureProvider>
          <UseFeature name="Feature Not Exist" />
        </FeatureProvider>,
      ),
    ).toThrowError(/Feature not found/)
  })

  it('should throw when not used within <FeatureProvider />', () => {
    expect(() => render(<UseFeature name="Feature Toggle" />)).toThrowError(
      /You must render this element inside a <FeatureProvider> element/,
    )
  })
})
