import React, { useEffect, useState } from "react";
import {
  Dimensions,
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
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

export default function Home() {
  const navigation = useNavigation<any>();
  const params = useLocalSearchParams();

  const [busca, setBusca] = useState("");

  const [carros, setCarros] = useState([
    {
      id: "1",
      nome: "Chevrolet Onix",
      imagem: require("../assets/images/onix.png"),
    },
    {
      id: "2",
      nome: "Volkswagen Gol",
      imagem: require("../assets/images/gol.png"),
    },
  ]);

  useEffect(() => {
    if (params.novoCarro) {
      const carro = JSON.parse(params.novoCarro as string);
      setCarros((prev) => [carro, ...prev]);
    }
  }, [params.novoCarro]);

  const carrosFiltrados = carros.filter((carro) =>
    carro.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  const renderCarro = (carro: any) => (
    <View key={carro.id} style={styles.card}>
      <Image
        source={
          typeof carro.imagem === "string"
            ? { uri: carro.imagem }
            : carro.imagem
        }
        style={styles.imagemCarro}
      />

      <TouchableOpacity
        style={styles.botaoInfo}
        onPress={() => navigation.navigate("detalhes", { carro })}
      >
        <Text style={styles.textoBotaoInfo}>+ infos</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoCadastro}
          onPress={() => navigation.navigate("cadastro")}
        >
          <Text style={styles.textoCadastro}>Cadastro</Text>
        </TouchableOpacity>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>Carros Disponíveis</Text>

        {/* BUSCA */}
        <TextInput
          placeholder="Buscar carro..."
          value={busca}
          onChangeText={setBusca}
          style={styles.inputBusca}
        />

        {/* 🔥 CARROS GERAIS */}
        <Text style={styles.subtitulo}>Encontre o Carro Perfeito</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {carros.map(renderCarro)}
        </ScrollView>

        {/* 🔍 BUSCA */}
        <Text style={styles.subtitulo}>Busca Recente</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {carrosFiltrados.map(renderCarro)}
        </ScrollView>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FOOTER */}
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

  botaoCadastro: {
    backgroundColor: "#14C871",
    padding: 8,
    borderRadius: 6,
  },

  textoCadastro: { color: "#FFF" },

  titulo: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 22,
  },

  subtitulo: {
    marginLeft: 20,
    marginTop: 15,
    fontSize: 16,
  },

  inputBusca: {
    backgroundColor: "#F0F0F0",
    marginHorizontal: 20,
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
  },

  card: {
    width: width * 0.7,
    margin: 10,
  },

  imagemCarro: {
    width: "100%",
    height: 150,
    borderRadius: 15,
  },

  botaoInfo: {
    backgroundColor: "#406CFF",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
  },

  textoBotaoInfo: { color: "#FFF" },

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
