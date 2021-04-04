import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField } from '../../modules/write';
import TagBox from '../../components/write/TagBox';

const TagBoxContainer = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector(state => state.write);

  const onChangeTags = useCallback(
    nextTags => {
      dispatch(
        changeField({
          key: 'tags',
          value: nextTags,
        })
      );
    },
    [dispatch]
  );

  return <TagBox tags={tags} onChangeTags={onChangeTags} />;
};

export default TagBoxContainer;
