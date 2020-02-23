const regex =	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default (emails)=>{
  const inValidEmails = emails.split(',').map(email=>email.trim()).filter(email=>regex.test(email)===false);
  if(inValidEmails.length!==0){
    return `These emails are invalid ${inValidEmails}`;
  }
}
