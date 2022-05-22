import React from 'react'

import FEATURE_CONFIG from './features.json'
import './features.css'

const LOCAL_STORAGE_KEY = 'feature-toggles'

type FeatureConfig = typeof FEATURE_CONFIG[number]
interface FeatureContextType {
  features: Array<FeatureConfig>
  setFeature(name: string, enabled: boolean): void
}
const FeatureContext = React.createContext<FeatureContextType | undefined>(
  undefined,
)

export const FeatureProvider = ({
  featureConfig,
  children,
}: {
  featureConfig?: Array<FeatureConfig>
  children: React.ReactNode
}) => {
  const [features, setFeatures] = React.useState<Array<FeatureConfig>>(
    getInitialFeatures(),
  )

  const setFeature = (name: string, enabled: boolean) => {
    const nextState = features.map((feature) => {
      if (feature.name === name)
        return { ...feature, enabled }

      return feature
    })
    localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(nextState)
    setFeatures(nextState)
  }

  return (
    <FeatureContext.Provider value={{ features, setFeature }}>
      {children}
    </FeatureContext.Provider>
  )

  function getInitialFeatures() {
    const overrides = JSON.parse(localStorage[LOCAL_STORAGE_KEY] ?? '[]')

    return (featureConfig || FEATURE_CONFIG).map((config) => {
      const override = overrides.find(
        (override: FeatureConfig) => override.name === config.name,
      )
      return override ? { ...config, enabled: override.enabled } : config
    })
  }
}

export const FeatureToggle = () => {
  const { features, setFeature } = useFeatureContext()

  return (
    <div className="mx-auto">
      <ul className="p-4">
        {features.map((feature, index) => {
          const { name, description, enabled } = feature
          return (
            <li
              key={name}
              className={`${index > 0 ? 'mt-5' : ''} flex flex-col`}
            >
              <div className="flex justify-between align-start">
                <span className="font-semibold text-sm text-black">{name}</span>
                <input
                  aria-label={name}
                  type="checkbox"
                  checked={enabled}
                  onChange={() => setFeature(name, !enabled)}
                />
              </div>
              <div className="text-xs text-gray-500">{description}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function useFeature(name: string) {
  const { features } = useFeatureContext()
  const feature = features.find(f => f.name === name)
  invariant(feature, 'Feature not found')
  return feature
}

function useFeatureContext() {
  const context = React.useContext(FeatureContext)
  invariant(
    context, 'You must render this element inside a <FeatureProvider> element',
  )
  return context
}

function invariant(value: boolean, message?: string): asserts value
function invariant<T>(
  value: T | null | undefined,
  message?: string,
): asserts value is T
function invariant(value: unknown, message?: string) {
  if (value === false || value === null || typeof value === 'undefined')
    throw new Error(message)
}
