'use client';

//* components
import Icon from '../ui/texts/icon';
import Subtitle from '../ui/texts/subtitle';
import EmptyStateTasks from './empty-state-tasks';
import TaskItem from './task-item';
import Divider from '../ui/texts/divider';

//* hooks
import useUserTasks from '@/hooks/use-user-tasks';

const TasksCon = () => {
    // states and variables
    const tasks: any = useUserTasks();

    if (tasks.loading)
        return (
            <p className='text-center'>
                <Icon
                    iconName='spinner-third fa-spin'
                    style='fad'
                />
            </p>
        );

    return (
        <div>
            {!tasks.error ? (
                tasks?.data?.length ? (
                    <>
                        <div>
                            {tasks?.data?.map(
                                (task: any) =>
                                    !task?.task_complete && (
                                        <TaskItem
                                            key={task._id}
                                            taskData={task}
                                        />
                                    )
                            )}
                        </div>
                        <div className='mt-4'>
                            <section className='mb-2'>
                                <Subtitle
                                    subtitle='COMPLETED'
                                    additionalClasses='text-xs my-2'
                                />
                                <Divider />
                            </section>

                            {tasks?.data?.map(
                                (task: any) =>
                                    task?.task_complete && (
                                        <TaskItem
                                            key={task._id}
                                            taskData={task}
                                        />
                                    )
                            )}
                        </div>
                    </>
                ) : (
                    <EmptyStateTasks />
                )
            ) : (
                <p>{tasks.error}</p>
            )}
        </div>
    );
};

export default TasksCon;
