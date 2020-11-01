//Global imports
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';

//File imports
import Styles from './Styles';


//Component imports
import CustomHeader from '../../Components/CustomerHeader/index';
import DrawerIcon from '../../../assets/images/Menu.png';
import HomeBg from '../../../assets/images/HomeBg.png';
import CustomInput from '../../Components/TextField/index';
import CustomButton from '../../Components/Button/index';
import BlackPin from '../../../assets/images/blackpin.png';
import Colors from '../../Helper/Colors';

const {
    MainView,
    BackGroundImage,
    Container,
    InputContainer,
    BottomView,
    OnDemandButton,
    LocationInput
} = Styles;

const CustomerHome = ({ navigation: { navigate, toggleDrawer } }) => {

    const [isOnDemand, SetIsOnDemand] = useState(false)
    const [offDemand, SetOffDemand] = useState(false)
   
    const _toggleDrawer = () => {
        toggleDrawer()
    }

    const _navigateToService = (job_type) => {
        navigate('CustomerService', { job_type })
    }

   
    const renderHeader = () => {
        return <CustomHeader
            title='Fixmart'
            LeftIcon={DrawerIcon}
            onLeftClick={() => _toggleDrawer()}
        />
    }

    const renderMainView = () => {
        return <View style={Container}>
            <View style={MainView}>
                {renderLocationField()}
                {renderBackGroundImage()}
                {renderBottomView()}
            </View>
        </View>
    }

    const renderBackGroundImage = () => {
        return <ImageBackground
            source={HomeBg}
            resizeMode='contain'
            style={BackGroundImage}
        />
    }

    const renderLocationField = () => {
        return <CustomInput
            leftImg={BlackPin}
            inputStyle={LocationInput}
            value={'309 Choa Chu Kang Avenue 4'}
            leftimgStyle={{ marginLeft: 0 }}
            containerView={InputContainer}
        />
    }

    const renderBottomView = () => {
        return <View style={BottomView}>
            {renderButton()}
        </View>
    }

    const renderButton = () => {
        return <View>
            <CustomButton
                title='On Demand'
                buttonAction={() => {
                    SetIsOnDemand(true)
                    SetOffDemand(false)
                    _navigateToService(1)
                }}
                btnStyle={[OnDemandButton, {
                    backgroundColor: isOnDemand ? Colors.DRAWER_BACKGROUND_COLOR : 'transparent',
                    borderWidth: !isOnDemand ? 1 : 0
                }]}
            />

            <CustomButton
                title='Off Demand'
                buttonAction={() => {
                    SetOffDemand(true)
                    SetIsOnDemand(false)
                    _navigateToService(2)
                }}
                btnStyle={[OnDemandButton, {
                    marginBottom: 0,
                    backgroundColor: !offDemand ? 'transparent' : Colors.DRAWER_BACKGROUND_COLOR,
                    borderWidth: !offDemand ? 1 : 0
                }]}
            />
        </View>
    }

    return (
        <View style={{ flex: 1 }}>
            {renderHeader()}

            {renderMainView()}
        </View>
    )
}

export default CustomerHome;
