import React,{Component} from 'react';
import {reduxForm,Field} from 'redux-form';
import SurveyField from './surveyField';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import validEmails from '../../utils/validEmails.js';
import formFields from './formFields'



const FIELDS = formFields;

class SurveyForm extends Component{
  renderField(){
    return(
        FIELDS.map(({label,name})=><Field type='text' key ={name} component={SurveyField} label={label} name={name}/>)
    );
  }

  render(){
    return(
      <div>
      <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
        {this.renderField()}
        <Link to='/surveys' className='red btn-flat white-text'>Cancel</Link>
        <button type='submit' className='teal btn-flat right white-text'>
        Next
        <i className="material-icons right">done</i>
        </button>


      </form>

      </div>
    );
  }
}
function validate(value){
  const errs={};
  _.each(FIELDS,({name})=>{
    if(!value[name]){
      errs[name]='You must provide a value!'
    }
  })
  errs.recipients=validEmails(value.recipients||'');
  // if(!value.title){
  //   errs.title='You must provide a title!';
  // }
  return errs;

}
export default reduxForm({validate,form:'surveyForm',destroyOnUnmount:false})(SurveyForm);
