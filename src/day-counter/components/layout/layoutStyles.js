import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  headerIconBox: {
    backgroundColor: "#AD46FF",
    padding: 10,
    borderRadius: 12,
    margin: 12,
    alignSelf: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#777777",
  },

  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 10,
    color: "#777777",
    marginTop: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#AF52DE",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  activeIcon: {
    size: 22,
    color: "#AF52DE",
  },
  inactiveIcon: {
    size: 22,
    color: "#777777",
  },
});
