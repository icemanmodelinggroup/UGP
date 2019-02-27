struct PCB{
  /*various data fields within the PCB structure*/
  /*in this implementation just ID is included*/
  int ID;
  struct PCB *next;
  struct PCB *prev;
} typedef PCB;

void enqueue(PCB **pntrHN, PCB **pntrTL, PCB passedPCB);
PCB  dequeue(PCB **pntrHN, PCB **pntrTL);

int main(int argc, char * argv[]){
  PCB **headOfQueue;
  PCB **tailOfQueue;
  PCB pcbNode;

  headOfQueue = malloc(sizeof(PCB*));
  tailOfQueue = malloc(sizeof(PCB*));
  *headOfQueue = 0;
  *tailOfQueue = 0;

  enqueue(headOfQueue,tailOfQueue,pcbNode);

  return(0);

}
void enqueue(PCB **pntrHN, PCB **pntrTL, PCB passedPCB){

  PCB *pntrToNodeToBeAdded;
  pntrToNodeToBeAdded = malloc(sizeof(PCB));
  *pntrToNodeToBeAdded = passedPCB;
  pntrToNodeToBeAdded->prev = 0; /*nothing in behind it*/
  pntrToNodeToBeAdded->next = *pntrTL;

  if(*pntrTL != 0){
    (*pntrTL)->prev = pntrToNodeToBeAdded;
  }
else{

    /*this is the first node to be added so populate tail*/

    *pntrTL = pntrToNodeToBeAdded;

    *pntrHN = pntrToNodeToBeAdded;

    }

 

  *pntrTL = pntrToNodeToBeAdded;

}
