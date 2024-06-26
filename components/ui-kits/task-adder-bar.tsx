'use client';

// Public
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Input } from '@nextui-org/react';
import AddDateBtn from '../ui/buttons/add-date-btn';
import AddToListBtn from '../ui/buttons/add-to-list-btn';
import AddReminderBtn from '../ui/buttons/add-reminder-btn';
import AddTaskBtn from '../ui/buttons/add-task-btn';
import MobileMoreTaskOPtions from '../ui/buttons/mobile-more-task-options';
import { toast } from 'react-toastify';

//* Redux
import {
    setTaskTitle,
    setClearFields,
} from '@/redux/features/task-data/taskDataSlice';
import { addTask } from '@/helper/functions/task-functions';
import { getTasksByEmail } from '@/redux/features/tasks/tasksSlice';

const TaskAdderBar = () => {
    const fullPathname = usePathname();
    // States and variables
    const dispatch = useAppDispatch();
    const [isPending, startTransition] = useTransition();
    const userEmail = useAppSelector((state) => state.options.userEmail);
    const taskData = useAppSelector((state) => state.taskData);
    const lists = useAppSelector((state) => state.taskLists.data);

    // Submit task
    const submitTask = async (event: any) => {
        event.preventDefault();

        const task = await addTask(taskData, userEmail, fullPathname, lists);
        const messageStatus = task.status === 200 ? 'success' : 'error';
        toast[messageStatus](task.message);
        if (task.status === 200) {
            dispatch(setClearFields());
            dispatch(getTasksByEmail(userEmail));
        }
    };

    return (
        <form
            onSubmit={(event: any) => startTransition(() => submitTask(event))}
        >
            <Input
                size='lg'
                variant='bordered'
                placeholder='Type here'
                value={taskData.task_title}
                autoComplete='off'
                isDisabled={isPending}
                onChange={(event) => dispatch(setTaskTitle(event.target.value))}
                startContent={
                    <AddTaskBtn
                        submitTask={submitTask}
                        startTransition={startTransition}
                        isPending={isPending}
                    />
                }
                classNames={{
                    inputWrapper: 'task-adder-bar',
                }}
                endContent={
                    <div>
                        <MobileMoreTaskOPtions />
                        <section className='hidden md:flex'>
                            <AddDateBtn />
                            <AddToListBtn />
                            <AddReminderBtn />
                        </section>
                    </div>
                }
            />
        </form>
    );
};

export default TaskAdderBar;
