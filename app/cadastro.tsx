import React, { useState } from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

export default function Cadastro() {
  const router = useRouter();

  const [imagem, setImagem] = useState<string | null>(null);

  const [titulo, setTitulo] = useState("");
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");

  const escolherImagem = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert("Permissão necessária", "Permita acesso à galeria");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  };

  const salvar = () => {
    if (!imagem) {
      Alert.alert("Erro", "Selecione uma imagem");
      return;
    }

    if (!titulo || !placa || !marca || !modelo || !ano || !cor) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const novoCarro = {
      id: Date.now().toString(),
      nome: titulo,
      placa,
      marca,
      modelo,
      ano,
      cor,
      imagem,
    };

    router.push({
      pathname: "/",
      params: { novoCarro: JSON.stringify(novoCarro) },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoHeader}
          onPress={() => router.back()}
        >
          <Text style={styles.textoHeader}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text style={styles.titulo}>Cadastrar Veículo</Text>

        <View style={styles.boxImagem}>
          {imagem ? (
            <Image source={{ uri: imagem }} style={styles.preview} />
          ) : (
            <Text style={styles.textoImagem}>Escolha sua Imagem</Text>
          )}

          <View style={styles.linhaImagem}>
            <Text style={styles.salvarImagem}>Salvar</Text>

            <TouchableOpacity
              style={styles.botaoAnexar}
              onPress={escolherImagem}
            >
              <Text style={styles.textoAnexar}>Anexar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.label}>Escolha um Título</Text>

        <TextInput
          placeholder="Título"
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          placeholder="Placa"
          style={styles.input}
          value={placa}
          onChangeText={setPlaca}
        />
        <TextInput
          placeholder="Marca"
          style={styles.input}
          value={marca}
          onChangeText={setMarca}
        />
        <TextInput
          placeholder="Modelo"
          style={styles.input}
          value={modelo}
          onChangeText={setModelo}
        />
        <TextInput
          placeholder="Ano"
          style={styles.input}
          value={ano}
          onChangeText={setAno}
        />
        <TextInput
          placeholder="Cor"
          style={styles.input}
          value={cor}
          onChangeText={setCor}
        />

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvar}>
          <Text style={styles.textoSalvar}>Salvar</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Ionicons name="home-outline" size={30} color="#FFF" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    height: 60,
    backgroundColor: "rgba(80,79,80,0.36)",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  botaoHeader: {
    backgroundColor: "#14C871",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 6,
  },
  textoHeader: { color: "#FFF", fontSize: 12 },
  titulo: {
    textAlign: "center",
    fontSize: 30,
    color: "#434343",
    marginTop: 15,
  },
  boxImagem: {
    backgroundColor: "#F8F6F8",
    margin: 20,
    borderRadius: 15,
    padding: 15,
    elevation: 5,
    alignItems: "center",
  },
  preview: { width: "100%", height: 150, borderRadius: 10 },
  textoImagem: { fontSize: 15 },
  linhaImagem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  salvarImagem: { fontSize: 15 },
  botaoAnexar: {
    backgroundColor: "#14C871",
    padding: 8,
    borderRadius: 8,
  },
  textoAnexar: { color: "#FFF" },
  label: { marginLeft: 20, marginTop: 10 },
  input: {
    backgroundColor: "rgba(67,67,67,0.2)",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  botaoSalvar: {
    backgroundColor: "#14C871",
    alignSelf: "flex-end",
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
  },
  textoSalvar: { color: "#FFF" },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 65,
    backgroundColor: "#406CFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
