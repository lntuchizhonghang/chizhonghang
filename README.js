# chizhonghang
It is a moldule which is used by read files.

/*
 *  raed file muldules
 */
 var fs = require('fs');
 var stdin=process.stdin;
 var stdout=process.stdout;
 fs.readdir(process.cwd(),function (err, files){
   if(!files.length){
      return console.log('The file do not have indexes!');
   }
   var staters=[];
   function file (i){
     var filename=files[i];
     fs.stat(__dirname+'/'+filename,function (err , stats){
       staters.push(stats);
       if(stats.isDirectory()){
         console.log('  '+i+'  '+filename+'[DIR]');
       }else{
         console.log('  '+i+'  '+filename);
       }
       i++;
       if(i==files.length){
         stdout.write('Ensure your filename:');
         stdin.resume();
         stdin.setEncoding('utf8');
         stdin.on('data',function (data){
           if(!files[Number(data)]){

             stdout.write('Ensure your filaname:');

           }else{
             stdin.pause();
             if(staters[Number(data)].isDirectory()){
               fs.readdir(__dirname+'/'+files[Number(data)],function (err , dirs){
                 console.log(' ');
                 console.log('  ('+dirs.length+' files)');
                 dirs.forEach(function (dir){
                   console.log(' ');
                   console.log('   ----'+dir);
                 });
               });
             }else{
             fs.readFile(__dirname+'/'+files[Number(data)],'utf8',function (err , datas){
               console.log('  ');
               console.log(datas);
             });
            }
           }
         });
       }else{
         file(i);
       }
     });
   }
   file(0);
 });
