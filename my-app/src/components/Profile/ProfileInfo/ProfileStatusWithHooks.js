import React, {useEffect, useState} from 'react';

export const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

const keyPressed = (event)=>{
    if (event.key === "Enter") {
        deactivateEditMode();
    }
};
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (event) => {
        setStatus(event.currentTarget.value)
    };
    return (
        <div>
            {!editMode &&
            <div>
                <b>Status:</b><span onDoubleClick={activateEditMode}>{props.status || 'no current status'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input
                    onChange={onStatusChange}
                    onBlur={deactivateEditMode}
                    onKeyPress={keyPressed}
                    autoFocus={true}
                    value={status}
                />
            </div>
            }
        </div>
    );
};


export default ProfileStatusWithHooks;