import React, { useState } from "react";
import Navbar from "./components/navbar";
import {
  Input,
  Box,
  Text,
  Button,
  Select,
  Container,
  Flex,
  Stack,
  StackDivider,
  Square,
} from "@chakra-ui/react";
import { db } from "../config/firebaseConfig";
import uploadImage from "../bin/uploadImage";

function RegistrationForWebinar() {
  const defaultForm = {
    kompetisi: "",
    asal_sekolah: "",
    nama_ketua_tim: "",
    nama_anggota_1: "",
    nama_anggota_2: "",
    email_ketua_tim: "",
  };

  const defaultFile = {
    file_pembayaran: "",
    file_formulir_pendaftaran: "",
  };

  const [form, setForm] = useState(defaultForm);

  const [file, setFile] = useState(defaultFile);

  async function handleSubmitForm(e) {
    e.preventDefault();
    let ongoingForm = {
      ...form,
      url_file_pembayaran: "",
      url_file_formulir_pendaftaran: "",
    };
    try {
      await uploadImage(
        "Pembayaran",
        "pembayaran_" + form.nama_ketua_tim,
        file.file_pembayaran,
        async (imageUrl) => {
          ongoingForm["url_file_pembayaran"] = imageUrl;
          await uploadImage(
            "Formulir Pendaftaran",
            "formulir_pendaftaran_" + form.nama_ketua_tim,
            file.file_formulir_pendaftaran,
            async (imageUrl) => {
              ongoingForm["url_file_formulir_pendaftaran"] = imageUrl;
              const submitToFirestore = await db
                .collection("registration")
                .add(ongoingForm);
              console.log("UPLOADED!!");
            }
          );
        }
      );
    } catch (err) {
      alert(err);
    }
    setForm(defaultForm);
    setFile(defaultFile);
    document.getElementById("filePembayaran").value = "";
    document.getElementById("filePendaftaran").value = "";
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
  }

  async function handleSelectFile(e) {
    let elementTargetName = "file_pembayaran";
    if (e.target.name == "file_formulir_pendaftaran") {
      elementTargetName = "file_formulir_pendaftaran";
    }
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const inputName = e.target.name;
      defaultFile[elementTargetName] = selectedFile;

      setFile((prev) => {
        return {
          ...prev,
          [inputName]: selectedFile,
        };
      });
    }
  }

  return (
    <div className="registration_for_staff">
      <Navbar />
      <Container maxW="container.md">
        <Stack>
          <form onSubmit={handleSubmitForm}>
            <Box>
              <Text fontSize="sm">Nama Lengkap</Text>
              <Input
                size="sm"
                name="nama_lengkap"
                value=""
                onChange={handleChangeInput}
              />
            </Box>

            {/*  */}

            <Flex>
              <Button
                colorScheme="teal"
                type="submit"
                flex="1"
                my={5}
                onClick={handleSubmitForm}
              >
                Submit
              </Button>
            </Flex>
          </form>
        </Stack>
      </Container>
    </div>
  );
}

export default RegistrationForWebinar;
