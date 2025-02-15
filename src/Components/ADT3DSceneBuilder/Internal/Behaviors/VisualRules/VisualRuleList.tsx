import { IContextualMenuItem, Theme, useTheme } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { CardboardList } from '../../../../CardboardList';
import { ICardboardListItem } from '../../../../CardboardList/CardboardList.types';
import { classNames } from '../../../../CardboardList/CardboardListItem.styles';
import { IVisualRule, IVisualRulesListProps } from './VisualRules.types';
import { ReactComponent as MeshAndBadgeIcon } from '../../../../../Resources/Static/meshAndBadgeIcon.svg';
import { getVisualRuleListStyles } from './VisualRuleList.styles';

/**
 *
 * Visual Rule List will handle the generation of ruleItems and the actions on a rule
 */

export const VisualRulesList: React.FC<IVisualRulesListProps> = ({
    ruleItems,
    onEditRule,
    onRemoveRule
}) => {
    const { t } = useTranslation();
    const theme = useTheme();

    //list of data in carbboardlist shape
    const [listItems, setListItems] = useState<
        ICardboardListItem<IVisualRule>[]
    >([]);

    //making sure to display the correct listItem when one of the dependencies below changes
    useEffect(() => {
        //making sure to get the rules in cardboardlist data shape
        const listItems = getListItems(
            ruleItems,
            onRemoveRule,
            onEditRule,
            theme,
            t
        );
        setListItems(listItems);
    }, [ruleItems, onRemoveRule, onEditRule, t, theme]);

    return (
        <CardboardList<IVisualRule>
            listKey={'visualRules-in-behavior'}
            items={listItems}
        />
    );
};

function getBadgesAndMeshesCount(item: IVisualRule) {
    let badgeCount = 0;
    let meshColoringCount = 0;
    item.conditions.forEach((condition) => {
        if (condition.visual.iconName) {
            badgeCount = badgeCount + 1;
        } else {
            meshColoringCount = meshColoringCount + 1;
        }
    });

    return [badgeCount, meshColoringCount];
}

function getSecondaryText(item: IVisualRule, t: TFunction<string>) {
    const [badgeCount, meshColoringCount] = getBadgesAndMeshesCount(item);
    const badgeCondition =
        badgeCount > 1
            ? t('3dSceneBuilder.behaviorVisualRulesTab.multipleBadges', {
                  badgeCount: badgeCount
              })
            : t('3dSceneBuilder.behaviorVisualRulesTab.singleBadge');
    const meshColoringCondition =
        meshColoringCount > 1
            ? t(
                  '3dSceneBuilder.behaviorVisualRulesTab.multipleElementColorings',
                  {
                      meshColoringCount: meshColoringCount
                  }
              )
            : t('3dSceneBuilder.behaviorVisualRulesTab.singleElementColoring');
    let text = '';
    if (meshColoringCount > 0 && badgeCount > 0) {
        text = text.concat(`${meshColoringCondition + ', ' + badgeCondition}`);
    } else if (badgeCount > 0) {
        text = text.concat(`${badgeCondition}`);
    } else if (meshColoringCount > 0) {
        text = text.concat(`${meshColoringCondition}`);
    }
    return text;
}

function getListItems(
    rules: IVisualRule[],
    onRemoveRule: (ruleItem: string) => void,
    onEditRule: (ruleItem: string) => void,
    theme: Theme,
    t: TFunction<string>
) {
    const getMenuItems = (item: IVisualRule): IContextualMenuItem[] => {
        return [
            {
                key: 'edit',
                id: 'editRuleOverflow',
                'data-testid': 'editRuleOverflow',
                text: t('3dSceneBuilder.behaviorVisualRulesTab.editRule'),
                iconProps: { iconName: 'Edit' },
                onClick: () => onEditRule(item.id)
            },
            {
                key: 'remove',
                id: 'removeRuleOverflow',
                'data-testid': 'removeRuleOverflow',
                text: t('3dSceneBuilder.behaviorVisualRulesTab.removeRule'),
                iconProps: { iconName: 'Delete' },
                onClick: () => onRemoveRule(item.id)
            }
        ];
    };

    function getIconStart(item: IVisualRule) {
        const [badgeCount, meshCount] = getBadgesAndMeshesCount(item);
        let icon;
        if (meshCount && badgeCount) {
            icon = () => (
                <div className={getVisualRuleListStyles(theme)}>
                    <MeshAndBadgeIcon />
                </div>
            );
        } else if (meshCount) {
            icon = {
                name: 'CubeShape'
            };
        } else if (badgeCount) {
            icon = {
                name: 'Ringer'
            };
        }
        return icon;
    }

    return rules.map((item) => {
        const primaryTextClassName = `.${classNames.primaryText}`;
        const viewModel: ICardboardListItem<IVisualRule> = {
            ariaLabel: '',
            iconStart: getIconStart(item),
            item: item,
            onClick: () => onEditRule(item.id),
            overflowMenuItems: getMenuItems(item),
            textPrimary: item.displayName,
            textSecondary: getSecondaryText(item, t),
            buttonProps: {
                customStyles: {
                    root: {
                        [primaryTextClassName]: {
                            fontStyle: item.isUnlabeled ? 'italic' : 'normal'
                        }
                    }
                }
            }
        };
        return viewModel;
    });
}
