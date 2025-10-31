
import React from 'react';
import { InfoItem } from '../types';

interface InfoSectionProps {
  title: string;
  items: InfoItem[];
  bgColor?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, items, bgColor = 'bg-brand-blue' }) => {
  return (
    <div className={`${bgColor} py-24 sm:py-32`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-accent">Our Strategy</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className={`grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-${items.length > 3 ? 2 : items.length} xl:grid-cols-${items.length > 3 ? 3 : items.length}`}>
            {items.map((item) => (
              <div key={item.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  {item.icon}
                  {item.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-brand-gray">
                  <p className="flex-auto">{item.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
