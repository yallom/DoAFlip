import { Modal, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed/themed-text';
import { AppColors } from '@/constants/theme';

type ConfirmLogoutModalProps = {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
};

export function ConfirmLogoutModal({ visible, onClose, onConfirm, isLoading = false }: ConfirmLogoutModalProps) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 items-center justify-center px-6">
                <View className="w-full bg-white rounded-3xl p-6 border border-[#13EC5B]/20">
                    <View className="w-12 h-12 rounded-full items-center justify-center mb-4" style={{ backgroundColor: '#fee2e2' }}>
                        <MaterialCommunityIcons name="logout" size={22} color="#ef4444" />
                    </View>

                    <ThemedText className="text-xl font-bold text-stone-900 mb-2">Logout</ThemedText>
                    <ThemedText className="text-sm text-stone-600 mb-6">
                        Tem a certeza que quer sair da sua conta?
                    </ThemedText>

                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            onPress={onClose}
                            disabled={isLoading}
                            className="flex-1 items-center justify-center py-3 rounded-xl border border-[#13EC5B]/30"
                        >
                            <ThemedText className="font-semibold text-stone-700">Cancelar</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onConfirm}
                            disabled={isLoading}
                            className="flex-1 items-center justify-center py-3 rounded-xl"
                            style={{ backgroundColor: '#ef4444' }}
                        >
                            <ThemedText className="font-semibold text-white">Logout</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
