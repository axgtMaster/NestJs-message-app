import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Console } from 'console';
import { response } from 'express';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';



@Controller('mensajes')
export class MensajesController {

    constructor(private MensajesServices: MensajesService){

    }
        @Post()
        create (@Body() createMensajeDto: CreateMensajeDto, @Res() response) {
            this.MensajesServices.createMensaje(createMensajeDto).then( mensaje => {
                response.status(HttpStatus.CREATED).json(mensaje);
            }).catch( () => {
                response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la creación del mensaje'});
            });
        }

        @Get()
        getAll (@Res() response){
            // response.setHeader("Content-type",'text/json');
              this.MensajesServices.getAll().then( mensajesList => {
                 response.status(HttpStatus.OK).json(mensajesList);
             }).catch( () => {
                 response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la obtención del mensaje'});
            // const mes = await this.MensajesServices.getAll();
            // return  response.status(HttpStatus.OK).json(mes);
        });
    }

        @Put(':id')
        update(@Body() updateMesajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje) {
            this.MensajesServices.updateMensaje(idMensaje, updateMesajeDto).then(mensaje => {
                response.status(HttpStatus.OK).json(mensaje);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la edición del mensaje'});
            });
        }

        @Delete(':id')
        delete(@Res() response, @Param('id') idMensaje) {
            this.MensajesServices.deleteMensaje(idMensaje).then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la eliminación del mensaje'});
            });
        }
        
}