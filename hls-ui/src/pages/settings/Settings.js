import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SettingsForm from "../../components/SettingsForm";

const Settings = () => {

    const [settings, setSettings] = useState(undefined);
    useEffect(() => {
        axios.get('/api/settings/')
            .then(resp => {
                console.log('LOAD>', resp.data);
                setSettings(resp.data);
            });
    }, []);

    const onSubmit = (data) => {
        axios.post('/api/settings/', data)
            .then(resp => {
                setSettings(resp.data);
            });
    };

    return (
        <>
            Settings
            {
                settings && <SettingsForm onSubmit={onSubmit} data={settings}/>
            }

        </>
    );
};

export default Settings;

