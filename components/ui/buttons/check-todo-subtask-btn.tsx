'use client';

//* components
import Icon from '../texts/icon';

const CheckTodoSubtaskBtn = ({
    isCompleted,
    isPending,
}: {
    isCompleted?: boolean;
    isPending?: boolean;
}) => {
    const iconName = isPending ? '' : isCompleted ? 'check-square' : 'square';
    const iconStyle = isCompleted ? 'fas' : 'far';
    return (
        <Icon
            iconName={iconName}
            style={iconStyle}
        />
    );
};

export default CheckTodoSubtaskBtn;
