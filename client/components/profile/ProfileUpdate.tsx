import { updateUser } from "@/actions/authActions";
import Form from "../global/Form";
import Button from "../global/Button";
type formData = {
  name: string;
  image: string;
  get: (arg: string) => string;
};
const ProfileUpdate = () => {
  async function handleUpdateProfile(formData: formData) {
    const name = formData.get("name");
    const image = formData.get("image");
    const res = await updateUser({ name, image });
    if (res?.msg) alert(res?.msg);
  }

  return (
    <div>
      <h2>Update Profile</h2>
      <Form action={handleUpdateProfile}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="image" placeholder="Image" required />
        <Button value="Update Profile" />
        {/* <button>Update Profile</button> */}
      </Form>
    </div>
  );
};

export default ProfileUpdate;
