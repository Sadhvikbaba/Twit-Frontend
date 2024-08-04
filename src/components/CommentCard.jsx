import React, { useState } from 'react';
import { FaThumbsUp, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { formatDistanceToNow } from 'date-fns';
import {Input , Button} from './index';

const CommentCard = ({
    commentId,
    username,
    content,
    createdAt,
    isLiked,
    totalLikes,
    isOwnComment,
    onEdit,
    onDelete,
    onToggleLike,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit } = useForm();

    const handleEditSubmit = (data) => {
        onEdit(commentId, data.content);
        setIsEditing(false);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-white font-bold">{username}</span>
                <span className="text-gray-400 text-sm">{formatDistanceToNow(new Date(createdAt))} ago</span>
            </div>
            {isEditing ? (
                <form onSubmit={handleSubmit(handleEditSubmit)} className='space-y-2'>
                    <Input
                        label="comment"
                        defaultValue={content}
                        {...register("content", { required: true })}
                    />
                    <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</Button>
                    <Button
                        type="button"
                        className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </Button>
                </form>
            ) : (
                <p className="text-white mb-2">{content}</p>
            )}
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <FaThumbsUp
                        className={`cursor-pointer ${isLiked ? 'text-blue-500' : 'text-gray-400'}`}
                        onClick={() => onToggleLike(commentId)}
                    />
                    <span className="text-white ml-2">{totalLikes}</span>
                </div>
                {isOwnComment && !isEditing && (
                    <div className="flex items-center space-x-2">
                        <FaPencilAlt
                            className="cursor-pointer text-gray-400 hover:text-white"
                            onClick={() => setIsEditing(true)}
                        />
                        <FaTrash
                            className="cursor-pointer text-gray-400 hover:text-red-500"
                            onClick={() => onDelete(commentId)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentCard;
