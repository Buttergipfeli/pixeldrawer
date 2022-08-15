import styles from './Toolbar.module.css';
import React from 'react'
import { NextPage } from 'next';

type Props = {
    toolbarInfos: { username: string; color: string; };
    selected: number;
}

const Toolbar: NextPage<Props> = ({ toolbarInfos, selected }) => {
    return (
        <div className={styles.toolbar} style={{ alignItems: (toolbarInfos.username !== '' ? 'center' : '') }}>
            {toolbarInfos.username !== ''
                ?
                <div className={styles.toolbarText}>
                    <span>Username: {toolbarInfos.username}</span>
                    <span>Color: {toolbarInfos.color}</span>
                </div>
                :
                (selected === 0
                    ?
                    <span>Nothing selected!</span>
                    :
                    <span>Empty field!</span>
                )
            }
        </div>
    )
}

export { Toolbar };