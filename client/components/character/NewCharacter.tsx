"use client";
import Link from "next/link";
import Button from "../global/Button";
import Form from "../global/Form";
import { addNewCharacter } from "@/actions/playerActions";
import { useRouter } from "next/navigation";
const NewCharacter = () => {
  const router = useRouter();
  async function createNewUserHandler(formData) {
    const name = formData.get("name");
    const sex = formData.get("sex");
    const res = await addNewCharacter({ name, sex });

    res.msg !== "Player sucessfully created" ? alert(res.msg) : router.refresh();
  }
  return (
    <div className="absolute z-50 inset-0 flex items-center justify-center flex-col">
      <h2>Sign up with Next Auth</h2>
      <Form action={createNewUserHandler}>
        <label htmlFor="name">Choose a name:</label>
        <input type="text" id="name" name="name" placeholder="Character Name" required />
        <label htmlFor="sex">Choose a car:</label>
        <select id="sex" name="sex">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <Button value="Register" />
      </Form>
      <div>
        <Link href="/signin">Sign In</Link>
      </div>
    </div>
  );
};

export default NewCharacter;
