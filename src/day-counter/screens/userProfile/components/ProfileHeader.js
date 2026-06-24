import React from "react";
import { View, Text } from "react-native";
import profileStyles from "../profileStyle";

export const ProfileHeader = ({ userData, stats }) => {
  return (
    <>
      <View style={profileStyles.userCard}>
        <Text style={profileStyles.userName}>{userData.name}</Text>
        <Text style={profileStyles.userEmail}>{userData.email}</Text>
      </View>

      <View style={profileStyles.statsContainer}>
        {stats.map((stat) => (
          <View key={stat.label} style={profileStyles.statCard}>
            <Text style={profileStyles.statValue}>{stat.value}</Text>
            <Text style={profileStyles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </>
  );
};
