import React, { useRef, useState } from "react"
import { useParams } from "react-router-dom";
import emailjs from "emailjs-com"
import classes from './SendEmail.module.css'
const SendEmailForm = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmitted, setDidSubmitted] = useState(false);
    const param=useParams();
    const userId = param.qid;
    console.log(typeof(userId));

    let str = ""
    console.log(props.data);
    for (let key in props.data) {
        str += props.data[key] + ";";
    }

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);



        emailjs.sendForm('service_r1hizja', 'template_rh6ia25', e.target, 'Py0QKxjxpCst7v9HX')
            .then((result) => {
                console.log(result.text);
                setIsSubmitting(false);
                setDidSubmitted(true);
            }, (error) => {
                console.log(error.text);
                setDidSubmitted(false);
            });

    };
    


    return (
        <React.Fragment>
            {/* {!didSubmitted && <form onSubmit={sendEmail}>
                <input type="text" name="from_name" value={userId} hidden/>
                Leader Mail:<input type="text" name="email" value={props.data[0]} ></input><br></br>
                CC:<input type="text" name="multiple" ref={multipleEmailref} value={str} ></input><br></br>
                Message:<textarea name="reason" ref={messageInputRef} required></textarea>
                <input type="submit" value="Book slot"></input>
            </form>
            }
            {didSubmitted && <p>Message sent successfully</p>} */}
           

  <body className={classes.body}>
  {!didSubmitted && <form className={classes.form} onSubmit={sendEmail} >
      <h2><u>Send Mail</u></h2>
      <input type="text" name="from_mail" value={userId} hidden/>
      <input type="text" name="reply_to" value={userId} hidden/>
      <input
        id="first-name"
        type="text"
        required
        placeholder="Your name"
        name="from_name"
      />
      <input
        id="first-name"
        type="text"
        required
        placeholder="Purpose"
        name="purpose"
      />

     

      <input className={classes.eml} type="email" required placeholder="@email" name="email" value={props.data[0]}/>
      <input className={classes.eml} type="text" required placeholder="Bcc" name="multiple"   value={str}/>

      <textarea
        rows="6"
        required
        placeholder="Message"
        name="message"
      ></textarea>

      <button className={classes.button} type="reset">Reset</button>
      <button className={classes.button} type="submit">Submit</button>
    </form>}
    {didSubmitted && <p>Message sent successfully</p>}
  </body>



        </React.Fragment>

    )
}

export default SendEmailForm;