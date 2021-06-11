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

function RegistrationForStaff() {
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
        <Stack
          spacing="100px"
          divider={<StackDivider borderColor="black" align="stretch" />}
        >
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

            <Box>
              <Text fontSize="sm">NPM (10 digit)</Text>
              <Input
                size="sm"
                name="npm"
                value=""
                onChange={handleChangeInput}
              />
            </Box>

            <Box>
              <Text fontSize="sm">Jurusan</Text>
              <Select
                placeholder="Pilih Jurusan"
                size="sm"
                name="jurusan"
                value=""
                onChange={handleChangeInput}
              >
                <option value="S1 Teknik Informatika">
                  S1 Teknik Informatika
                </option>
                <option value="S1 Teknik Sipil">S1 Teknik Sipil</option>
                <option value="S1 Kedokteran">S1 Kedokteran</option>
              </Select>
            </Box>

            <Box>
              <Text fontSize="sm">ID Line</Text>
              <Input
                size="sm"
                name="id_line"
                value=""
                onChange={handleChangeInput}
              />
            </Box>

            <Box>
              <Text fontSize="sm">No. WhatsApp</Text>
              <Input
                size="sm"
                name="no_whatsapp"
                value=""
                onChange={handleChangeInput}
              />
            </Box>

            <Box>
              <Text fontSize="sm">Pilihan Divisi</Text>
              <Stack>
                <Select
                  placeholder="Event"
                  size="sm"
                  name="event_1"
                  value=""
                  onChange={handleChangeInput}
                >
                  <option value="Event 1.A">Event 1.A</option>
                  <option value="Event 1.B">Event 1.B</option>
                  <option value="Event 1.C">Event 1.C</option>
                </Select>
                <Select
                  placeholder="Event"
                  size="sm"
                  name="event_2"
                  value=""
                  onChange={handleChangeInput}
                >
                  <option value="Event 2.A">Event 2.A</option>
                  <option value="Event 2.B">Event 2.B</option>
                  <option value="Event 2.C">Event 2.C</option>
                </Select>
                <Select
                  placeholder="Event"
                  size="sm"
                  name="event_3"
                  value=""
                  onChange={handleChangeInput}
                >
                  <option value="Event 3.A">Event 3.A</option>
                  <option value="Event 3.B">Event 3.B</option>
                  <option value="Event 3.C">Event 3.C</option>
                </Select>
              </Stack>
            </Box>

            <Box>
              <Text fontSize="sm">Pilihan Interview</Text>
              <Stack>
                <Flex>
                  <Square w="150px">
                    <Select
                      placeholder="Hari"
                      size="sm"
                      name="hari_1"
                      value=""
                      onChange={handleChangeInput}
                    >
                      <option value="Senin">Senin</option>
                      <option value="Selasa">Selasa</option>
                      <option value="Rabu">Rabu</option>
                      <option value="Kamis">Kamis</option>
                      <option value="Jumat">Jumat</option>
                      <option value="Sabtu">Sabtu</option>
                      <option value="Minggu">Minggu</option>
                    </Select>
                  </Square>
                  <Box flex="1">
                    <Select
                      placeholder="Sesi"
                      size="sm"
                      name="sesi_1"
                      value=""
                      onChange={handleChangeInput}
                    >
                      <option value="Sesi 1">Sesi 1</option>
                      <option value="Sesi 2">Sesi 2</option>
                    </Select>
                  </Box>
                </Flex>
                <Flex>
                  <Square w="150px">
                    <Select
                      placeholder="Hari"
                      size="sm"
                      name="hari_2"
                      value=""
                      onChange={handleChangeInput}
                    >
                      <option value="Senin">Senin</option>
                      <option value="Selasa">Selasa</option>
                      <option value="Rabu">Rabu</option>
                      <option value="Kamis">Kamis</option>
                      <option value="Jumat">Jumat</option>
                      <option value="Sabtu">Sabtu</option>
                      <option value="Minggu">Minggu</option>
                    </Select>
                  </Square>
                  <Box flex="1">
                    <Select
                      placeholder="Sesi"
                      size="sm"
                      name="sesi_2"
                      value=""
                      onChange={handleChangeInput}
                    >
                      <option value="Sesi 1">Sesi 1</option>
                      <option value="Sesi 2">Sesi 2</option>
                    </Select>
                  </Box>
                </Flex>
              </Stack>
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

export default RegistrationForStaff;
