import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { SEARCH_TOOLS_QUERY } from '../../../util/graphql';
import { useForm } from '../../../util/hooks';
import { FiSearch } from 'react-icons/fi';

import styled from 'styled-components';

const SearchBar = () => {
  return (
    <Fragment>
      <Form inline onSubmit={handleSubmit} className='p-2 flex-grow-1 nav-search-wrapper'>
        <FormControl
          type='text'
          name='search'
          autoComplete='off'
          onChange={handleChange}
          value={values.search}
          placeholder='Find a tool...'
          className='mr-sm-2 nav-search-input'
          id='search-input'
          required
        />
        <Button type='submit' variant='info' className='nav-search-btn'>
          <FiSearch />
        </Button>
      </Form>
    </Fragment>
  );
};

export default SearchBar;

const AutoCompleteWrapper = styled.div`
  display: block;
  background: #ffffff;
`;
