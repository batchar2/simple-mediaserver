import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SettingsForm from "../../components/SettingsForm";

const Settings = () => {
    const [isSaved, SetIsSaved] = useState(undefined);
    const [settings, setSettings] = useState(undefined);
    useEffect(() => {
        axios.get('/api/settings/')
            .then(resp => {
                setSettings(resp.data);
            });
    }, []);

    const onSubmit = (data) => {
        axios.post('/api/settings/', data)
            .then(resp => {
                setSettings(resp.data);
                SetIsSaved(true);
            });
    };
    console.log('isSaved>', isSaved)
    return (
        <>
            <h2>Settings</h2>
            {
                isSaved &&
                    <div style={{color: 'green', border: '1px solid green', width: '100%', padding: '5px'}}>
                        Settings saved successfully
                    </div>
            }
            {
                settings && <SettingsForm onSubmit={onSubmit} data={settings}/>
            }

        </>
    );
};

export default Settings;

