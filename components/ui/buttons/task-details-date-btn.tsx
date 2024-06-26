'use client';

// Public
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@nextui-org/react';
import Icon from '../texts/icon';
import Subtitle from '../texts/subtitle';
import Calendar from '@/components/ui-kits/calendar';
import TooltipElement from '../texts/tooltip-element';

//* Functions
import {
    getDayOfWeek,
    getDate,
    getLocalDateString,
} from '@/helper/functions/functions';

//* Redux
import { setTaskDueDate } from '@/redux/features/selected-task/selectedTaskSlice';

const TaskDetailsDateBtn = () => {
    const dispatch = useAppDispatch();
    // States and variables
    const date = useAppSelector((state) => state.selectedTask.task_due_date);
    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

    // Functions
    const changeDatePicked = (date: Date | null) => {
        dispatch(setTaskDueDate(date));
        setIsOpenDatePicker(false);
    };

    return (
        <Dropdown
            className='bg-primary-100'
            isOpen={isOpenDatePicker}
            onOpenChange={() => setIsOpenDatePicker(!isOpenDatePicker)}
        >
            {/* The dropdown trigger */}
            <TooltipElement title='Add due date'>
                <div>
                    <DropdownTrigger>
                        <Button
                            variant='bordered'
                            className='task-details-btn'
                            fullWidth
                            radius='sm'
                            startContent={
                                <Icon
                                    iconName='calendar-days'
                                    color={date ? 'text-foreground' : ''}
                                />
                            }
                        >
                            {date
                                ? getLocalDateString(new Date(date))
                                : 'Task date'}
                        </Button>
                    </DropdownTrigger>
                </div>
            </TooltipElement>

            {/* The dropdown menu */}
            <DropdownMenu variant='flat'>
                {/* The default options */}
                <DropdownItem
                    startContent={<Icon iconName='calendar-day' />}
                    endContent={<Subtitle subtitle={getDayOfWeek().today} />}
                    onClick={() => changeDatePicked(getDate().today)}
                >
                    Today
                </DropdownItem>
                <DropdownItem
                    startContent={<Icon iconName='calendar-arrow-down' />}
                    endContent={<Subtitle subtitle={getDayOfWeek().tomorrow} />}
                    onClick={() => changeDatePicked(getDate().tomorrow)}
                >
                    Tomorrow
                </DropdownItem>
                <DropdownItem
                    startContent={<Icon iconName='calendar-week' />}
                    endContent={<Subtitle subtitle='Saturday' />}
                    onClick={() => changeDatePicked(getDate().nextWeek)}
                    showDivider
                >
                    Next Week
                </DropdownItem>

                {/* Optional selection option (calendar popover) */}
                <DropdownItem
                    startContent={<Icon iconName='calendar-day' />}
                    isReadOnly
                >
                    <Popover>
                        <PopoverTrigger>Pick a date</PopoverTrigger>
                        <PopoverContent className='p-0 bg-background'>
                            <Calendar
                                mode='single'
                                className='rounded-md border'
                                selected={date}
                                onSelect={(date: any) => changeDatePicked(date)}
                                disabled={{ before: new Date() }}
                            />
                        </PopoverContent>
                    </Popover>
                </DropdownItem>
                <DropdownItem
                    startContent={
                        <Icon
                            iconName='trash'
                            color='text-danger'
                        />
                    }
                    className={date ? 'text-danger' : 'hidden'}
                    onClick={() => changeDatePicked(null)}
                    color='danger'
                >
                    Remove due date
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default TaskDetailsDateBtn;
