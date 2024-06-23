import React, { useState } from 'react';
import { Group } from '../data/groups';

interface SidebarProps {
    groups: Group[];
    onSelectTicker: (ticker: string) => void;
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ groups, onSelectTicker, isOpen }) => {
    const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});

    const toggleGroup = (groupName: string) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="sidebar">
            <h2>Market Groups</h2>
            {groups.map((group) => (
                <div key={group.name} className="group">
                    <div
                        className="group-header"
                        onClick={() => toggleGroup(group.name)}
                    >
                        {group.name}
                        <span className="expanded-indicator">
              {expandedGroups[group.name] ? '▼' : '▶'}
            </span>
                    </div>
                    {expandedGroups[group.name] && (
                        <ul className="group-items">
                            {group.items.map((item) => (
                                <li key={item.ticker} onClick={() => onSelectTicker(item.ticker)}>
                                    {item.name} ({item.ticker})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Sidebar;