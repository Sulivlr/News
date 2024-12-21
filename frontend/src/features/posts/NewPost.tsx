import React, { useState } from 'react';
import { PostMutation } from '../../types';
import { Grid, TextField } from '@mui/material';
import FileInput from "../../UI/FileInput/FileInput";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/SaveAs';
import { useAppDispatch } from "../../app/hooks";
import { createPost, fetchPosts } from "../posts/postsThunks";
import { useNavigate } from 'react-router-dom';

interface Props {
  onSubmit: (mutation: PostMutation) => void;
  isLoading: boolean;
}

const NewPost: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState<PostMutation>({
    title: '',
    text: '',
    comment: '',
    image: null
  });

  const formSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(createPost(state));
    dispatch(fetchPosts());
    onSubmit({ ...state });
    navigate('/');
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form autoComplete="off" onSubmit={formSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            id="title"
            label="Title"
            value={state.title}
            name="title"
            onChange={inputChange}
            required
            fullWidth
          />
        </Grid>

        <Grid item>
          <TextField
            id="text"
            label="Text"
            value={state.text}
            onChange={inputChange}
            name="text"
            required
            fullWidth
          />
        </Grid>

        <Grid item>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item>
          <LoadingButton
            type="submit"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Save
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewPost;
