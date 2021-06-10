import React, { useState } from "react";
import { Input, Box, Text, Button } from "@chakra-ui/react";
import { db } from "../../config/firebaseConfig";
import uploadImage from "../../bin/uploadImage";

function DaftarPage() {
  
  const [form, setForm] = useState({
    nama_lengkap: "",
    nomor_hp: "+62",
  });

  const [file, setFile] = useState(null);

  async function handleSubmitForm(e) {
    e.preventDefault();

    await uploadImage(file, async (imageUrl) => {
      console.log(`uploaded!`, imageUrl);
      // submit form ke firebase
      const submitToFirestore = await db.collection("formulir").add({
        ...form,
        imageUrl: imageUrl,
      });
    });

    setForm({
      nama_lengkap: "",
      nomor_hp: "+62",
    });
  }

  function handleChangeInput(e) {
    const inputName = e.target.name; // nama_lengkap
    const inputValue = e.target.value;

    setForm((prev) => {
      return {
        ...prev,
        [inputName]: inputValue,
      };
    });
    console.log(form);
  }

  async function handleSelectFile(e) {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
    // speakerPhoto is to be used when uploading
  }

  return (
    <Box padding={10}>
      <form onSubmit={handleSubmitForm}>
        <Text>Halaman Pendaftaran</Text>
        <Input
          value={form.nama_lengkap}
          name="nama_lengkap"
          onChange={handleChangeInput}
          type="text"
          placeholder="Nama lengkap"
        />
        <Text>No HP</Text>
        <Input
          value={form.nomor_hp}
          name="nomor_hp"
          onChange={handleChangeInput}
          type="text"
          placeholder="No HP"
        />
        <Box my={4}>
          <input
            multiple
            onChange={handleSelectFile}
            id="fileBlob"
            name="fileBlob"
            type="file"
            className="sr-only"
          />
        </Box>
        <Button my={4} onClick={handleSubmitForm}>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default DaftarPage;
