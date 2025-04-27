// styles/documentListStyles.js
import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
    
  },
  tagContainer: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  tagHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.card,
  },
  tagHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight:400,
    color: colors.highlight,
  },
  itemCount: {
    fontSize: 12,
    color: colors.muted,
  },
  childList: {
    paddingLeft: 32,
    paddingBottom: 8,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    
  },
  noteLabel: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight:400,
    color: colors.text,
  },
  notesList: {
    marginTop: 8,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#00000040',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    backgroundColor: colors.modalBackground,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: 200,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: colors.text,
  },
  menuTextDanger: {
    fontSize: 16,
    color: colors.danger,
  },
});
