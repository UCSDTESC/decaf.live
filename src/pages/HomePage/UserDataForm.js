import React from 'react';
import { Formik, Field } from 'formik';
import { Input, FormFeedback } from "reactstrap";
import * as yup from "yup";
import { withFirebase } from '../../data/firebase';

const input = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <div>
      <Input
        invalid={!!(touched[field.name] && errors[field.name])}
        {...field}
        {...props}
        value={field.value || ""}
      />
      {touched[field.name] && errors[field.name] && (
        <FormFeedback>{errors[field.name]}</FormFeedback>
      )}
    </div>
  );
};

class UserDataForm extends React.Component {

  constructor(props) {  
    super(props);
    const phoneRegex = /^[0-9]{10}$/;
    this.schema = yup.object({
      fullName: yup.string().required('Name is required'),
      email: yup.string().email('Invalid Email'),
      ticketNum: yup.number().required('Ticket Number is required'),
      phone: yup.string().matches(phoneRegex, 'Phone Number is not valid')
    })
  }

  render() {
    return (
      <Formik
      validationSchema={this.schema}
      initialValues={{ fullName: '', email: '', ticketNum: '', phone: '' }}
      onSubmit={async (values, { setSubmitting, setFieldError, setStatus, resetForm }) => {
        try {
          await this.props.firebase.addUserNotifInfo(values);
          setStatus({success: 'Done!'})
          resetForm();
        } catch {
          setFieldError('general', 'Something went wrong during form submit')
        } finally {
          setSubmitting(false);
        }
      }}
    >
    {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        status
        /* and other goodies */
      }) => (
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="text-center">
          {status ? status.success : ''}
        </div>
        <div className="row">
          <div className="col">
            <label>Full Name</label>
            <Field name="fullName" type="text" component={input} placeholder={'King Triton'}/>
          </div>
          <div className="col">
            <label>Email</label>
            <Field name="email" type="email" component={input} placeholder={'ktriton@ucsd.edu'} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <label>Ticket Number</label>
            <Field name="ticketNum" type="number" component={input} placeholder={1337}/>
          </div>
          <div className="col">
            <label>Phone Number</label>
            <Field name="phone" type="number" component={input} placeholder={1234567890} />
          </div>
        </div>
        <div className="row">
          <button type="submit" className="mx-auto mt-4 btn btn-light">Subscribe</button>
          <div className="text-center text-danger">
            {errors.general}
          </div>
        </div>
      </form>)}
      </Formik>
    );
  }
}

export default withFirebase(UserDataForm);