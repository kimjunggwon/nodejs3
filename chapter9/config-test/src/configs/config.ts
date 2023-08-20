import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import common from './common';
import local from './local';
import dev from './dev';
import prod from './prod';

//phase에 NODE_ENV 값 저장
const phase = process.env.NODE_ENV;

//phase의 값에 따라서 적절한 환경 변숫값을 conf에 저장
let conf = {};
if(phase === 'local'){
    conf = local;
}else if(phase === 'dev'){
    conf = dev;
}else if(phase === 'prod'){
    conf = prod;
}

const yamlConfig: Record<string, any> = yaml.load( //YAML 파일 로딩
    readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf8'),
);

//common과 conf에서 받은 값을 합쳐서 결과값으로 주는 함수 반환
export default () => ({
    ...common,
    ...conf,
    ...yamlConfig
});