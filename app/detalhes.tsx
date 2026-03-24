import React from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Detalhes() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { carro } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCadastro}
          onPress={() => navigation.navigate("cadastro")}
        >
          <Text style={styles.textoCadastro}>Cadastro</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* IMAGEM */}
        <Image
          source={
            typeof carro.imagem === "string"
              ? { uri: carro.imagem }
              : carro.imagem
          }
          style={styles.imagem}
        />

        {/* TÍTULO */}
        <Text style={styles.titulo}>{carro.nome}</Text>

        {/* CARD */}
        <View style={styles.card}>
          <Text style={styles.texto}>Placa: {carro.placa}</Text>
          <Text style={styles.texto}>Marca: {carro.marca}</Text>
          <Text style={styles.texto}>Modelo: {carro.modelo}</Text>
          <Text style={styles.texto}>Ano: {carro.ano}</Text>
          <Text style={styles.texto}>Cor: {carro.cor}</Text>

          <TouchableOpacity style={styles.botaoContato}>
            <Text style={styles.textoContato}>Entrar em contato</Text>
          </TouchableOpacity>

          {/* 🔥 BOTÕES */}
          <View style={styles.linhaBotoes}>
            <TouchableOpacity style={styles.botaoEditar}>
              <Text style={styles.textoBotao}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoExcluir}>
              <Text style={styles.textoBotao}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Ionicons name="chevron-back" size={28} color="#FFF" />
        <Ionicons name="home-outline" size={28} color="#FFF" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },

  header: {
    height: 60,
    backgroundColor: "rgba(80,79,80,0.36)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  botaoCadastro: {
    backgroundColor: "#14C871",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 6,
  },

  textoCadastro: { color: "#FFF", fontSize: 12 },

  imagem: {
    width: "100%",
    height: 220,
  },

  titulo: {
    textAlign: "center",
    fontSize: 24,
    marginTop: 15,
    color: "#000",
  },

  card: {
    backgroundColor: "#F3F3F3",
    margin: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },

  texto: {
    fontSize: 18,
    color: "#000",
    marginBottom: 5,
  },

  botaoContato: {
    backgroundColor: "#406CFF",
    marginTop: 15,
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
  },

  textoContato: {
    color: "#FFF",
    fontSize: 18,
  },

  linhaBotoes: {
    flexDirection: "row",
    marginTop: 10,
  },

  botaoEditar: {
    backgroundColor: "#14C871",
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 5,
  },

  botaoExcluir: {
    backgroundColor: "#434343",
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 5,
  },

  textoBotao: {
    color: "#FFF",
  },

  footer: {
    height: 65,
    backgroundColor: "#406CFF",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
