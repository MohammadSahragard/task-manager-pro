'use client';

// Public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Chip } from '@nextui-org/react';
import Icon from '../texts/icon';
import { toast } from 'react-toastify';

//* Redux
import { getTasksByEmail } from '@/redux/features/tasks/tasksSlice';
import { setIsOpenedDetailsSidebar } from '@/redux/features/options/optionsSlice';

const DeleteTaskOption = ({ neededId }: { neededId: string }) => {
    const dispatch = useAppDispatch();
    // States and variables
    const userEmail = useAppSelector((state) => state.options.userEmail);

    // Functions
    const deleteTask = async () => {
        const res = await fetch('/api/user-tasks/task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: neededId }),
        });

        const data = await res.json();
        const messageStatus = data.status === 200 ? 'success' : 'error';
        toast[messageStatus](data.message);

        if (data.status === 200) {
            dispatch(setIsOpenedDetailsSidebar(false));
            dispatch(getTasksByEmail(userEmail));
        }
    };

    return (
        <Chip
            variant='light'
            className='context-menu-options delete-options'
            startContent={
                <Icon
                    iconName='trash'
                    color='text-danger'
                />
            }
            onClick={deleteTask}
        >
            Delete task
        </Chip>
    );
};

export default DeleteTaskOption;
