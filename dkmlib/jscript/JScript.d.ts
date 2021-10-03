//declare function ActiveXObject(servername:string , typename?, location?) ;
declare function GetObject(comSrvName:string):any;

//declare class Enumerator {
//
//    constructor(items:any);
//    // atEnd Method
//    /**
//     * @return boolean
//     */
//    atEnd:()=>boolean;
//    // item Method
//    /**
//     * Remarks
//     * The item method returns the current item. If the collection is empty or the current item is undefined, it returns undefined.
//     * @return {Object}
//     */
//    item:()=>any;
//    // moveFirst Method
//    moveFirst:()=>void;
//    // moveNext Method
//    moveNext :()=>void;
//}


    /**
     * Set oComponent = GetObject("script:c:\COM\MyComponent.wsc")
     * Using wsc without registration
     */

    /**
     *
     * @param servername
     * @param [typename]
     * @param [location]
     * @constructor
     */

interface FileSystemObject {

        GetFile (filespec:string):IFileSystemObjectFile;

        GetFolder(folderspec:string):IFileSystemObjectFolder;

        CreateTextFile(szFilename:string, bOverwrite?:boolean, bUnicode?:boolean);

        /**
         *
         * @param szFilename
         * @param [iomode]
         * @param [bCreate]
         * @param [tsFormat]
         * Arguments
         * object
         * Required. Object is always the name of a FileSystemObject.
         * filename
         * Required. String expression that identifies the file to open.
         * iomode
         * Optional. Can be one of three constants: ForReading, ForWriting, or ForAppending.
         * create
         * Optional. Boolean value that indicates whether a new file can be created if the specified filename doesn't exist. The value is True if a new file is created, False if it isn't created. If omitted, a new file isn't created.
         * format
         * Optional. One of three Tristate values used to indicate the format of the opened file. If omitted, the file is opened as ASCII.
         * Settings
         * The iomode argument can have any of the following settings:
         *
         * Constant Value Description
         * ForReading 1 Open a file for reading only. You can't write to this file.
         * ForWriting 2 Open a file for writing.
         * ForAppending 8 Open a file and write to the end of the file.
         *
         * The format argument can have any of the following settings:

         Value Description
         TristateTrue Open the file as Unicode.
         TristateFalse Open the file as ASCII.
         TristateUseDefault Open the file using the system default.

         Remarks

         * @constructor
         */
        OpenTextFile (szFilename, iomode?:number, bCreate?:boolean, tsFormat?:number):IFileSystemObjectTextStream;

        /**
         *
         * @param folderspec
         * @return {Boolean}
         *  */
        FolderExists (folderspec:string):boolean;

        /**
         *
         * @param foldername
         * */
        CreateFolder (foldername:string):IFileSystemObjectFolder;

        /**
         *
         * @param filespec
         * @return {Boolean}
         * @constructor
         */
        FileExists (filespec:string) :boolean;

        DeleteFile (filespec:string):void;

        GetFileVersion (filespec:string) :string;
        Drive ():string;
    }



    interface IFileSystemObjectFile {
        // Copy Method
        /**
         *
         * @param destination
         * @param [overwrite]
         * @constructor
         */
        Copy (destination:string, overwrite?:boolean):IFileSystemObjectFile;
        // Delete Method
        /**
         *
         * @optional force
         * @constructor
         */
        Delete (force?:boolean):void;

        // Move Method
        /**
         *
         * @param destination
         * @constructor
         */
        Move (destination:string):void;

        // OpenAsTextStream Method
        /**
         * Arguments
         object
         Required. Always the name of a File object.
         iomode
         Optional. Indicates input/output mode. Can be one of three constants: ForReading, ForWriting, or ForAppending.
         format
         Optional. One of three Tristate values used to indicate the format of the opened file. If omitted, the file is opened as ASCII.
         *
         *                      Settings
         *The iomode argument can have any of the following settings:

         *Constant Value Description
         *ForReading 1 Open a file for reading only. You can't write to this file.
         *ForWriting 2 Open a file for writing. If a file with the same name exists, its previous contents are overwritten.
         *ForAppending 8 Open a file and write to the end of the file.

         *The format argument can have any of the following settings:

         *Constant Value Description
         *TristateUseDefault -2 Opens the file using the system default.
         *TristateTrue -1 Opens the file as Unicode.
         *TristateFalse  0 Opens the file as ASCII.

         * @optional iomode
         * @optional format
         * @constructor
         */
        OpenAsTextStream (iomode?:number, format?:number) :IFileSystemObjectTextStream;

        Name:string;

        GetFolder (szFolderSpec:string) :IFileSystemObjectFolder;
        /**
         *
         * @type {FileSystemObject.Folder}
         */
        ParentFolder:IFileSystemObjectFolder;

    }


    interface IFileSystemObjectFolder {
        // Copy Method

        // Delete Method
        // Move Method
        SubFolders:IFileSystemObjectFolder[];

        Attributes:any[];
        DateCreated:Date;
        DateLastAccessed:Date;
        DateLastModified:Date;
        Drive:string;
        Files:IFileSystemObjectFile[];
        IsRootFolder:boolean;
        Name:string;
        ParentFolder:IFileSystemObjectFolder;
        Path:string;
        ShortName:string;
        ShortPath:string;
        Size:number;
        Type:string;

        /**
         *
         * @param srcDir
         * @param dstDir
         * @param [overwrite] defaults to true
         * @constructor
         */
        CopyFolder (srcDir:string, dstDir:string, overwrite?:boolean):IFileSystemObjectFolder;
        MoveFolder  (source:string, destination:string) :void;
    }


    interface WshArguments {
        //Properties
        Item :any;

        //Length Property (WshArguments object)
        Length:number;

        // | Count Property |

        //Named: Property |
        Named:WshArguments;

        // Unnamed Property
        Unnamed:WshArguments;

        //Methods
        //Count Method
        Count():number;
        // | ShowUsage Method
        ShowUsage();
    }

    interface WScript {

        Arguments:WshArguments;
        ScriptFullName:string;

        ScriptName:string;
        /**
         *
         * @param intTime in Millisekunden
         * @constructor
         */
        Sleep(intTime:number):void;

        Echo (msg:string):void;
        /**
         *
         * @param {string } classId
         * @constructor
         */
        CreateObject (classId:string):any;
        Shell:IWScriptShell;
    }

    interface IWScriptShell {
            //Properties
            //CurrentDirectory Property
            CurrentDirectory :string;
            //Environment Property
            /**
             * Returns the WshEnvironment object (a collection of environment variables).

             Remarks
             The Environment property contains the WshEnvironment object (a collection of environment variables). If strType is supplied, it specifies where the environment variable resides with possible values of System, User, Volatile, or Process. If strType is not supplied, the Environment property returns different environment variable types depending on the operating system.

             Type of Environment Variable Operating System
             System Microsoft Windows NT/2000
             Process Windows 95/98/Me

             Note   For Windows 95/98/Me, only one strType is permitted — Process.
             The following table lists some of the variables that are provided with the Windows operating system. Scripts can access environment variables that have been set by other applications.

             Note   None of the following variables are available from the Volatile type.
             Name Description System User Process (NT/
             2000) Process (98/ME)
             NUMBER_OF_PROCESSORS Number of processors running on the machine. X - X -
             PROCESSOR_ARCHITECTURE Processor type of the user's workstation. X - X -
             PROCESSOR_IDENTIFIER Processor ID of the user's workstation. X - X -
             PROCESSOR_LEVEL Processor level of the user's workstation. X - X -
             PROCESSOR_REVISION Processor version of the user's workstation. X - X -
             OS Operating system on the user's workstation. X - X -
             COMSPEC Executable file for the command prompt (typically cmd.exe). X - X X
             HOMEDRIVE Primary local drive (typically the C drive). - - X -
             HOMEPATH Default directory for users (typically \users\default in Windows 2000). - - X -
             PATH PATH environment variable. X X X X
             PATHEXT Extensions for executable files (typically .com, .exe, .bat, or .cmd). X - X -
             PROMPT Command prompt (typically $P$G). - - X X
             SYSTEMDRIVE Local drive on which the system directory resides (typically c:\). - - X -
             SYSTEMROOT System directory (for example, c:\winnt). This is the same as WINDIR. - - X -
             WINDIR System directory (for example, c:\winnt). This is the same as SYSTEMROOT. X - X X
             TEMP Directory for storing temporary files (for example, c:\temp). - X X X
             TMP Directory for storing temporary files (for example, c:\temp). - X X X

             * @param [strType] System || Process
             * @constructor
             */
            Environment (strType:string):string;
            //SpecialFolders Property
            SpecialFolders : any;

            //Methods
            // AppActivate Method
            // CreateShortcut Method
            // ExpandEnvironmentStrings Method
            ExpandEnvironmentStrings (envstr:string):string;
            // LogEvent Method
            // Popup Method
            // RegDelete Method
            RegDelete (strName:string):void;
            // RegRead Method
            // RegWrite Method
            //object.RegRead(strName)
            RegRead (strName:string):string;

            //object.RegWrite(strName, anyValue [,strType])
            /**
             *
             * @param strName
             * @param anyValue
             * @param [strType]
             * @constructor
             */
            RegWrite (strName:string, anyValue:string, strType?:any):void;


            // Run Method
            //object.Run(strCommand, [intWindowStyle], [bWaitOnReturn])

            /**
             *
             * @param strCommand
             * @param [intWindowStyle]
             * 0 Hides the window and activates another window
             * 1 Activates and displays a window. If the window is minimized or maximized, the system restores it to its original size and position. An application should specify this flag when displaying the window for the first time.
             * 2 Activates the window and displays it as a minimized window.
             * 3 Activates the window and displays it as a maximized window.
             * 4 Displays a window in its most recent size and position. The active window remains active.
             * 5 Activates the window and displays it in its current size and position.
             * 6 Minimizes the specified window and activates the next top-level window in the Z order.
             * 7 Displays the window as a minimized window. The active window remains active.
             * 8 Displays the window in its current state. The active window remains active.
             * 9 Activates and displays the window. If the window is minimized or maximized, the system restores it to its original size and position. An application should specify this flag when restoring a minimized window.
             * 10 Sets the show-state based on the state of the program that started the application
             * @param [bWaitOnReturn]  boolean
             * @constructor
             */
            Run (strCommand:string, intWindowStyle?:number, bWaitOnReturn?:boolean):number;

            SendKeys(keys:string);

            // Exec Method


    }

    interface IFileSystemObjectTextStream {
        // methods
        Close():void;

        //object.Read(characters)
        Read(characters:number):string;

        ReadAll():string;

        ReadLine():string;

        Skip(characters:number);

        SkipLine();

        Write(buffer:string);
        //| WriteBlankLines Method
        WriteBlankLines(lines:number);
        // | WriteLine Method
        WriteLine(line?:string);

        // Properties
        AtEndOfLine:boolean;

        AtEndOfStream:boolean;

        Column:number;
        Line:number;
    }




