"use client";
import Form from "../global/Form";
import Button from "../global/Button";
import { signUpWithCredentials } from "@/actions/authActions";
const SignUp = () => {
  async function handleSignUpCredentials(formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
 
    const res = await signUpWithCredentials({ name, email, password });
    if (res?.msg) alert(res?.msg);
  }
  return (
    <div>
      <h2>Sign up with Next Auth</h2>
      <Form action={handleSignUpCredentials}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <Button value="Register" />
      </Form>
    </div>
  );
};

export default SignUp;
