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
} from "@chakra-ui/react";
import { db } from "../config/firebaseConfig";
import uploadImage from "../bin/uploadImage";

function Registration() {
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
    <div className="registration">
      <Navbar />
      <Container maxW="container.md">
        <Stack
          spacing="100px"
          divider={<StackDivider borderColor="black" align="stretch" />}
        >
          <form onSubmit={handleSubmitForm}>
            <Box>
              <Text fontSize="sm">Kompetisi</Text>
              <Select
                placeholder="Pilih Kompetisi"
                size="sm"
                name="kompetisi"
                value={form.kompetisi}
                onChange={handleChangeInput}
              >
                <option value="Sepak Catur">Sepak Catur</option>
                <option value="Tenis Kursi">Tenis Kursi</option>
                <option value="Polo Api">Polo Api</option>
              </Select>
            </Box>

            <Box>
              <Text fontSize="sm">Asal Sekolah</Text>
              <Input
                size="sm"
                name="asal_sekolah"
                value={form.asal_sekolah}
                onChange={handleChangeInput}
              />
            </Box>

            <Box>
              <Text fontSize="sm">Nama Ketua Tim</Text>
              <Input
                size="sm"
                name="nama_ketua_tim"
                value={form.nama_ketua_tim}
                onChange={handleChangeInput}
              />
            </Box>

            <Box>
              <Text fontSize="sm">Nama Anggota 1</Text>
              <Input
                size="sm"
                name="nama_anggota_1"
                value={form.nama_anggota_1}
                onChange={handleChangeInput}
              />
            </Box>

            <Box>
              <Text fontSize="sm">Nama Anggota 2</Text>
              <Input
                size="sm"
                name="nama_anggota_2"
                value={form.nama_anggota_2}
                onChange={handleChangeInput}
              />
            </Box>

            <Box>
              <Text fontSize="sm">Email Ketua Tim</Text>
              <Input
                size="sm"
                type="email"
                name="email_ketua_tim"
                value={form.email_ketua_tim}
                onChange={handleChangeInput}
              />
            </Box>

            <Box>
              <Text fontSize="sm">File Pembayaran (.pdf | max 4 MB)</Text>
              <Input
                onChange={handleSelectFile}
                size="sm"
                border="false"
                id="filePembayaran"
                name="file_pembayaran"
                type="file"
                className="filePembayaran"
              />
            </Box>

            <Box>
              <Text fontSize="sm">
                File Formulir Pendaftaran (.pdf | max 4 MB)
              </Text>
              <Input
                onChange={handleSelectFile}
                size="sm"
                border="false"
                id="filePendaftaran"
                name="file_formulir_pendaftaran"
                type="file"
                className="filePendaftaran"
              />
            </Box>

            <Flex>
              <Button colorScheme="teal" type="submit" flex="1" onClick={handleSubmitForm}>
                Submit
              </Button>
            </Flex>
          </form>
        </Stack>
      </Container>
    </div>
  );
}

export default Registration;
