import React, { useState, createContext, useContext } from 'react';

// =================================================================================================
// Tabs Component System
// A flexible and accessible set of components for creating tabbed interfaces.
// =================================================================================================

// --- 1. Create Context ---
// This context will share the active tab state and the function to change it.
interface TabsContextType {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

// --- 2. Main Tabs Wrapper ---
interface TabsProps {
  children: React.ReactNode;
  /** The default tab to be active. Defaults to the first tab (0). */
  defaultIndex?: number;
}

export const Tabs: React.FC<TabsProps> = ({ children, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className='flex flex-col w-full'>{children}</div>
    </TabsContext.Provider>
  );
};


// --- 3. TabList: The container for the tab buttons ---
interface TabListProps {
  children: React.ReactNode;
}

export const TabList: React.FC<TabListProps> = ({ children }) => {
  return (
    <div className="flex border-b border-border-primary mx-auto" role="tablist">
      {children}
    </div>
  );
};


// --- 4. Tab: The individual tab button ---
interface TabProps {
  children: React.ReactNode;
  /** The index of the tab, corresponding to its panel. */
  index: number;
}

export const Tab: React.FC<TabProps> = ({ children, index }) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be rendered within a Tabs component.');
  }

  const isActive = context.activeIndex === index;

  const baseStyles = 'px-6 py-3 font-semibold text-text-secondary transition-colors duration-200';
  const activeStyles = 'border-b-2 border-primary-base text-primary-base';
  const inactiveStyles = 'hover:text-text-primary';

  const classes = [
    baseStyles,
    isActive ? activeStyles : inactiveStyles,
  ].join(' ');

  return (
    <button
      className={classes}
      onClick={() => context.setActiveIndex(index)}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${index}`}
      id={`tab-${index}`}
    >
      {children}
    </button>
  );
};


// --- 5. TabPanels: The container for the content panels ---
interface TabPanelsProps {
  children: React.ReactNode[];
  className?: string;
}
 

export const TabPanels: React.FC<TabPanelsProps> = ({ children, className }) => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('TabPanels must be used within a Tabs component.');
    }

    return (
        <div className={`${className}`}>
            {children[context.activeIndex]}
        </div>
    );
};


// --- 6. TabPanel: The individual content panel ---
interface TabPanelProps {
  children: React.ReactNode;
  /** The index of the panel, corresponding to its tab. */
  index: number;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children, index }) => {
  return (
    <div
        role="tabpanel"
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
    >
        {children}
    </div>
  );
};

// --- Usage Example ---
/*
<Tabs>
  <TabList>
    <Tab index={0}>Missions & Values</Tab>
    <Tab index={1}>The Gospel</Tab>
    <Tab index={2}>What to Expect</Tab>
  </TabList>

  <TabPanels>
    <TabPanel index={0}>
      <p>Content for Missions & Values...</p>
    </TabPanel>
    <TabPanel index={1}>
      <p>Content for The Gospel...</p>
    </TabPanel>
    <TabPanel index={2}>
      <p>Content for What to Expect...</p>
    </TabPanel>
  </TabPanels>
</Tabs>
*/
