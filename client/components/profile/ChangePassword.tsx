import { changePasswordWithCredentials } from "@/actions/authActions";
import Button from "../global/Button";
import Form from "../global/Form";
const ChangePassword = () => {
  async function handleChangePassword(formData) {
    const old_pass = formData.get("old_pass");
    const new_pass = formData.get("new_pass");
    const res = await changePasswordWithCredentials({ old_pass, new_pass });
    if (res?.msg) alert(res?.msg);
  }
  return (
    <div>
      <h2>Change Password</h2>
      <Form action={handleChangePassword}>
        <input type="password" name="old_pass" placeholder="Old Password" required />
        <input type="password" name="new_pass" placeholder="New Password" required />
        <Button value="Change Password" />
      </Form>
    </div>
  );
};

export default ChangePassword;
