import React from 'react';
import { ComponentStory } from '@storybook/react';
import { getDefaultStoryDecorator } from '../../../../Models/Services/StoryUtilities';
import TimeSeriesBuilder from './TimeSeriesBuilder';
import { ITimeSeriesBuilderProps } from './TimeSeriesBuilder.types';
import MockAdapter from '../../../../Adapters/MockAdapter';
import { DataHistoryExplorerContext } from '../../DataHistoryExplorer';

const wrapperStyle = { width: '400px', height: '400px', padding: 8 };

export default {
    title: 'Components/DataHistoryExplorer/Internal/TimeSeriesBuilder/Mock',
    component: TimeSeriesBuilder,
    decorators: [
        getDefaultStoryDecorator<ITimeSeriesBuilderProps>(wrapperStyle)
    ]
};

type TimeSeriesBuilderStory = ComponentStory<typeof TimeSeriesBuilder>;

const Template: TimeSeriesBuilderStory = (args) => {
    return (
        <DataHistoryExplorerContext.Provider
            value={{ adapter: new MockAdapter() }}
        >
            <TimeSeriesBuilder {...args} />
        </DataHistoryExplorerContext.Provider>
    );
};

export const EmptyList = Template.bind({}) as TimeSeriesBuilderStory;
EmptyList.args = {
    onTimeSeriesTwinListChange: (timeSeriesTwinList) => {
        console.log(timeSeriesTwinList);
    }
} as ITimeSeriesBuilderProps;

export const LongList = Template.bind({}) as TimeSeriesBuilderStory;
LongList.args = {
    timeSeriesTwins: [
        {
            twinId: 'PasteurizationMachine_A01',
            twinPropertyName: 'InFlow',
            twinPropertyType: 'double',
            chartProps: { color: 'red' }
        },
        {
            twinId: 'PasteurizationMachine_A02',
            twinPropertyName: 'OutFlow',
            twinPropertyType: 'double',
            chartProps: { color: 'green' }
        },
        {
            twinId: 'PasteurizationMachine_A03',
            twinPropertyName: 'Temperature',
            twinPropertyType: 'double',
            chartProps: { color: 'blue' }
        },
        {
            twinId: 'PasteurizationMachine_A03',
            twinPropertyName: 'InFlow',
            twinPropertyType: 'double',
            chartProps: { color: 'orange' }
        },
        {
            twinId: 'SaltMachine_C1',
            twinPropertyName: 'InFlow',
            twinPropertyType: 'double',
            chartProps: { color: 'yellow' }
        },
        {
            twinId: 'SaltMachine_C2',
            twinPropertyName: 'OutFlow',
            twinPropertyType: 'float',
            chartProps: { color: 'pink' }
        },
        {
            twinId: 'SaltMachine_C3',
            twinPropertyName: 'Temperature',
            twinPropertyType: 'float',
            chartProps: { color: 'purple' }
        }
    ]
} as ITimeSeriesBuilderProps;