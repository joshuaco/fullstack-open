import { useContext } from 'react';
import { create, getAll, remove, sendComment, update } from '../services/blogs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import NotificationContext from '../contexts/NotificationContext';

export const useBlogs = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useContext(NotificationContext);

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll
  });

  const newBlogMutation = useMutation({
    mutationFn: ({ blogData, user }) => create(blogData, user),
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
      setNotification(`Blog '${newBlog.title}' added!`, 3);
    },
    onError: () => {
      setNotification('Error creating blog:', 3);
    }
  });

  const likeBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] });
    },
    onError: () => {
      setNotification('Authentication error', 3);
    }
  });

  const commentBlogMutation = useMutation({
    mutationFn: ({ comment, id }) => sendComment(comment, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] });
      setNotification('New comment added', 3);
    },
    onError: () => {
      setNotification('Error', 3);
    }
  });

  const removeBlogMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setNotification('Blog removed!', 3);
    },
    onError: () => {
      setNotification('Authentication error', 3);
    }
  });

  return {
    blogs,
    newBlogMutation,
    likeBlogMutation,
    commentBlogMutation,
    removeBlogMutation
  };
};
