import React from 'react'

import Layout from '../template/Layout'
import Header from '../template/Header'
import Footer from '../template/Footer'
import StudyNone from '../schedule/StudyNone'
import _ from '../../utils/_'

const Study = ({ navigation }) => {

    return (
        <Layout>
            <Header navigation={navigation} type={1} />
            <StudyNone navigation={navigation} />
            <Footer name='Study' navigation={navigation} />
        </Layout>
    )

}

export default Study