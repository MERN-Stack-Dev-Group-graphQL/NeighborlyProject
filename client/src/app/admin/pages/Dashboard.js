import React, { Fragment, /* useContext, */ useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Form, Select } from 'semantic-ui-react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaAngleLeft, FaArrowUp, FaTrash, FaArrowDown, FaPlusCircle } from 'react-icons/fa';
import { RiMenu2Line } from 'react-icons/ri';

import { useForm } from '../../../util/hooks';

import { FETCH_TOOLS_QUERY } from '../../../util/graphql';
import { ADD_TOOL_MUTATION } from '../../../util/graphql';
// import { useFormFile } from '../../../util/hooks';
// import { AuthContext } from '../../../context/auth';

import styled from 'styled-components';

function Dashboard() {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  // const { user } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOnChange = () => {};

  let currentDate = new Date();

  const initialState = {
    title: '',
    make: '',
    model: '',
    color: '',
    dimensions: '',
    weight: '',
    description: '',
    electricalRatings: '',
  };

  const { onChange, onSubmit, values } = useForm(addNewTool, initialState);

  const [addTool, { error }] = useMutation(ADD_TOOL_MUTATION, {
    variables: { input: values },
    update(proxy, result) {
      // console.log(result);
      const data = proxy.readQuery({
        query: FETCH_TOOLS_QUERY,
      });

      data.getTools = [result.data.addTool, ...data.getTools];
      proxy.writeQuery({ query: FETCH_TOOLS_QUERY, data });

      values.title = '';
      values.make = '';
      values.model = '';
      values.color = '';
      values.dimensions = '';
      values.weight = '';
      values.description = '';
      values.electricalRatings = '';
    },
    onError(err) {
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const { loading, data } = useQuery(FETCH_TOOLS_QUERY);
  // console.log(data);

  const categoryOptions = [
    { key: 'gen', name: 'category', text: 'GENERAL', value: 'GENERAL' },
    { key: 'con', name: 'category', text: 'CONSTRUCTION', value: 'CONSTRUCTION' },
    { key: 'cor', name: 'category', text: 'CORDED', value: 'CORDED' },
    { key: 'cls', name: 'category', text: 'CORDLESS', value: 'CORDLESS' },
    { key: 'app', name: 'category', text: 'APPLIANCE', value: 'APPLIANCE' },
    { key: 'saf', name: 'category', text: 'SAFETY', value: 'SAFETY' },
  ];

  function addNewTool() {
    console.log('Add New Tool clicked!');
  }

  function AddToolModal(props) {
    return (
      <Modal {...props} show={show} onHide={handleClose} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header closeButton>
          <Modal.Title>New Tool</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit} noValidate>
            <Form.Input
              placeholder='Title...'
              className='tool-form-input'
              name='title'
              type='text'
              value={values.title}
              error={errors.title ? true : false}
              onChange={onChange}
            />
            <Form.Input
              placeholder='Make'
              className='tool-form-input'
              name='make'
              type='text'
              value={values.make}
              error={errors.make ? true : false}
              onChange={onChange}
            />
            <Form.Input
              placeholder='Model'
              className='tool-form-input'
              name='model'
              type='text'
              value={values.model}
              error={errors.model ? true : false}
              onChange={onChange}
            />
            <Form.Input placeholder='Color' className='tool-form-input' name='color' type='text' value={values.color} onChange={onChange} />
            <Form.Input
              placeholder='Dimensions'
              className='tool-form-input'
              name='dimensions'
              type='text'
              value={values.dimensions}
              onChange={onChange}
            />
            <Form.Input
              placeholder='Weight'
              className='tool-form-input'
              name='weight'
              type='text'
              value={values.weight}
              onChange={onChange}
            />
            <Form.Input
              placeholder='Description'
              className='tool-form-input'
              name='description'
              type='text'
              value={values.description}
              error={errors.description ? true : false}
              onChange={onChange}
            />
            <Form.Input
              placeholder='Electrical Ratings'
              className='tool-form-input'
              name='electricalRatings'
              type='text'
              value={values.electricalRatings}
              onChange={onChange}
            />

            <Form.Field
              name='category'
              control={Select}
              options={categoryOptions}
              placeholder='Category'
              search
              searchInput={{ id: 'form-select-control-category' }}
              type='text'
              value={values.category}
              onChange={onChange}
            />

            <Form.Input name='file' type='file' required onChange={onChange} />

            <Button type='submit' className='btn btn-primary' color='teal'>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Fragment>
      <DashboardWrapper className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='admin-breadcrumbs-container'>
              <div className='admin-breadcrumbs'>
                <FaAngleLeft /> Neighbors
              </div>
              <div className='admin-date-time'>{currentDate.toDateString()}</div>
            </div>
            <hr />
            <div className='dashboard-header heading-1'>
              <h3 className='mb-0'>Dashboard</h3>
              <button className='btn btn-primary ml-auto'>Save</button>
            </div>
            <section id='add-tool'>
              <div className='tool-left-col'>
                <h4>Tool List</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit tempora voluptatibus blanditiis, possimus placeat sunt.
                  Perspiciatis, reprehenderit? Perspiciatis ratione quisquam accusamus hic enim dolorem, maxime necessitatibus odit fuga,
                  quos aliquid?
                </p>
              </div>
              <div className='tool-right-col'>
                <ul className='tool-list'>
                  {loading ? (
                    <h3>Loading tools...</h3>
                  ) : (
                    data.getTools.edges &&
                    data.getTools.edges.map((tool) => (
                      <li className='tool-item' key={tool._id}>
                        <div className='icon'>
                          <RiMenu2Line />
                        </div>
                        <div className='title'>{tool.title}</div>
                        <div className='controls'>
                          <div className='btn-group btn-group-toggle' datatoggle='buttons'>
                            <label className='btn btn-outline-primary active'>
                              <input type='radio' name='options' id='option1' autoComplete='off' checked onChange={handleOnChange} /> Edit
                            </label>
                            <label className='btn btn-outline-primary'>
                              <input type='radio' name='options' id='option2' autoComplete='off' /> <FaArrowUp />
                            </label>
                            <label className='btn btn-outline-primary'>
                              <input type='radio' name='options' id='option3' autoComplete='off' /> <FaArrowDown />
                            </label>
                            <label className='btn btn-outline-primary'>
                              <input type='radio' name='options' id='option4' autoComplete='off' /> <FaTrash />
                            </label>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                  <li className='tool-item-add-tool'>
                    <Button variant='add-tool' onClick={handleShow}>
                      <div className='icon'>
                        <FaPlusCircle />
                      </div>
                      Add new tool
                    </Button>
                    <AddToolModal />
                  </li>
                </ul>
              </div>
            </section>
            <hr />
          </div>
        </div>
      </DashboardWrapper>
    </Fragment>
  );
}

export default Dashboard;

const DashboardWrapper = styled.div`
  padding: 2rem;

  .admin-breadcrumbs-container {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .admin-breadcrumbs {
      display: flex;
      align-items: center;
      color: var(--color-grey-dark);
      font-size: 14px;
    }

    .admin-date-time {
      margin-left: auto;
    }
  }

  .dashboard-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  #add-tool {
    display: grid;
    grid-template-columns: 30% 1fr;
    grid-template-rows: 72px 1fr;

    grid-template-areas:
      'toolleft toolright toolright toolright'
      'toolleft toolright toolright toolright'
      'toolleft toolright toolright toolright'
      'toolleft toolright toolright toolright';

    .tool-left-col {
      grid-area: toolleft;
      padding-right: 1rem;
    }

    .tool-right-col {
      grid-area: toolright;

      .tool-list {
        padding: 0;
        list-style: none;

        .tool-item {
          display: flex;
          align-items: center;
          padding-bottom: 6px;
          margin-bottom: 6px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);

          .icon {
            display: flex;
            margin-right: 8px;
          }

          .title {
          }

          .controls {
            margin-left: auto;
          }
        }

        .tool-item-add-tool {
          .btn-add-tool {
            display: flex;
            align-items: center;
            color: var(--color-primary);

            &:hover {
              color: #138496;
            }

            .icon {
              display: flex;
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
`;
