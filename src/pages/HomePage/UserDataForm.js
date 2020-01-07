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
    this.schema = yup.object({
      fullName: yup.string().required('Name is required'),
      email: yup.string().email('Invalid Email'),
      ticketNum: yup.number().required('Ticket Number is required'),
    })
}

  render() {
    return (
      <Formik
      validationSchema={this.schema}
      initialValues={{ fullName: '', email: '', ticketNum: '', phone: '' }}
      onSubmit={(values, { setSubmitting }) => {
        this.props.firebase.addUserNotifInfo(values);
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
        /* and other goodies */
      }) => (
      <form className="mt-5" onSubmit={handleSubmit}>
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
            <Field name="phone" type="number" component={input} placeholder={11111111} />
          </div>
        </div>
        <div className="row">
          <button type="submit" className="mx-auto mt-4 btn btn-light">Subscribe</button>
        </div>
      </form>)}
      </Formik>
    );
  }
}

export default withFirebase(UserDataForm);