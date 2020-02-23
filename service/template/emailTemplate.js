const keys = require('../../config/keys');


module.exports = (survey)=>{
  return `
  <html>
    <body>
      <div>
        <h3>Thanks for participating our surveys!</h3>
        <h3>We really appreicate your response!</h3>
      <div>${survey.body}</div>
      <a href="${keys.redirectDomain}/api/${survey.id}/yes">Yes</a>
      <a href="${keys.redirectDomain}/api/${survey.id}/no">No</a>
      </div>
  </body>
  </html>
  `;
}
