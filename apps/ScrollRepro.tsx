// Repro: a formSheet whose screen has a native header (header shown in a
// modal) and a ScrollView taller than the sheet. The last rows can't be
// scrolled into view: the ScrollView is sized to the full sheet height even
// though it starts below the header, so its bottom hangs past the sheet.
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenStack, ScreenStackItem } from 'react-native-screens';

const ROWS = Array.from({ length: 30 }, (_, i) => i + 1);

export default function ScrollRepro() {
  const [open, setOpen] = useState(false);
  const [headerShown, setHeaderShown] = useState(true);
  const [large, setLarge] = useState(true);

  return (
    <ScreenStack style={styles.container}>
      <ScreenStackItem
        screenId="home"
        style={StyleSheet.absoluteFill}
        headerConfig={{ title: 'Scroll repro' }}>
        <View style={styles.home}>
          <Button
            title={`header: ${headerShown ? 'shown' : 'hidden'}`}
            onPress={() => setHeaderShown(v => !v)}
          />
          <Button
            title={`detent: ${large ? 'large [1.0]' : 'medium [0.5]'}`}
            onPress={() => setLarge(v => !v)}
          />
          <Button title="Open sheet" onPress={() => setOpen(true)} />
        </View>
      </ScreenStackItem>
      {open && (
        <ScreenStackItem
          screenId="sheet"
          style={StyleSheet.absoluteFill}
          stackPresentation="formSheet"
          sheetAllowedDetents={large ? [1.0] : [0.5]}
          sheetGrabberVisible
          headerConfig={
            headerShown ? { title: 'Sheet with header' } : { hidden: true }
          }
          onDismissed={() => setOpen(false)}>
          <ScrollView>
            {ROWS.map(n => (
              <View key={n} style={styles.row}>
                <Text>Row {n}</Text>
              </View>
            ))}
          </ScrollView>
        </ScreenStackItem>
      )}
    </ScreenStack>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  home: { flex: 1, gap: 12, padding: 24, justifyContent: 'center' },
  row: {
    height: 44,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
});
