import { CardboardClassNamePrefix } from '../../../../../Models/Constants/Constants';
import {
    IConditionsListStyles,
    IConditionsListStylesProps
} from './ConditionsList.types';

const classPrefix = CardboardClassNamePrefix + '-conditions-list';
const classNames = {
    container: `${classPrefix}-container`
};

export const getStyles = (
    props: IConditionsListStylesProps
): IConditionsListStyles => {
    return {
        container: [
            classNames.container,
            // 30px is label size, since this is resizing need to calc the 100% - label
            { overflow: 'auto', height: 'calc(100% - 30px)' }
        ],
        subComponentStyles: {
            addButton: {
                root: {
                    color: props.theme.palette.themePrimary
                }
            }
        }
    };
};
