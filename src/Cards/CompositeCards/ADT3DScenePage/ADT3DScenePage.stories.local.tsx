import React from 'react';
import useAuthParams from '../../../../.storybook/useAuthParams';
import ADTandBlobAdapter from '../../../Adapters/ADTandBlobAdapter';
import MsalAuthService from '../../../Models/Services/MsalAuthService';
import ADT3DScenePage from './ADT3DScenePage';

export default {
    title: 'CompositeCards/ADT3DScenePage'
};

const cardStyle = {
    height: '600px',
    width: '100%'
};

export const ADT3DScenePageCard = (_args, { globals: { theme, locale } }) => {
    const authenticationParameters = useAuthParams();

    return !authenticationParameters ? (
        <div></div>
    ) : (
        <div style={cardStyle}>
            <ADT3DScenePage
                title={'3D Scene Page'}
                theme={theme}
                locale={locale}
                adapter={
                    new ADTandBlobAdapter(
                        authenticationParameters.adt.hostUrl,
                        authenticationParameters.storage.accountHostUrl,
                        authenticationParameters.storage.blobPath,
                        new MsalAuthService(
                            authenticationParameters.adt.aadParameters
                        )
                    )
                }
            />
        </div>
    );
};